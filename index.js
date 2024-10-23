const express = require('express');
const bodyParser = require('body-parser')
const { resolve } = require('path');
const fs = require('fs')
const path = require('path')

const readdirSync = (p, a = []) => {
    if (fs.statSync(p).isDirectory())
        fs.readdirSync(p).map(f => readdirSync(a[a.push(path.join(p, f)) - 1], a))
    return a
}

if (process.env.VERCEL) {
    // We are using Vercel, so we have to trigger a read of the static files
    // needed by MockPass so that Vercel knows that we keep them at runtime

    readdirSync(__dirname);
}

const {UnitTestTree, SchematicTestRunner} = require("@angular-devkit/schematics/testing");
const {HostTree} = require("@angular-devkit/schematics");
const {setActiveProject, createProject, createSourceFile, saveActiveProject, resetActiveProject} = require("ng-morph");
const app = express();
const PORT = 4000;

const collectionPath = resolve(__dirname, 'node_modules/@taiga-ui/cdk/schematics/migration.json');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.post('/template', async (req, res) => {
    try {
        const body = req.body;

        let host = new UnitTestTree(new HostTree());
        let runner = new SchematicTestRunner('schematics', collectionPath);

        setActiveProject(createProject(host));

        createSourceFile(
            'package.json',
            '{"dependencies": {"@angular/core": "~13.0.0", "@taiga-ui/addon-commerce": "~3.42.0"}}',
        );

        createSourceFile(
            'angular.json',
            `
{
  "version": 1,
  "projects": {
    "demo": {
        "root": "",
        "architect": {
          "build": {
            "options": {
              "main": "test/main.ts",
              }
          }
        }
    }
  }
}`,
            {overwrite: true},
        );

        createSourceFile(`test/app/test.template.html`, ``);
        createSourceFile(`test/app/test.template.ts`, `
        import { Component } from "@angular/core";
        
        @Component({
            standalone: true,
            templateUrl: './test.template.html'
        })
        export class Test {
        }
    `);
        createSourceFile(`test/app/test.template.${body.type}`, body.content, {overwrite: true});

        saveActiveProject();

        const tree = await runner.runSchematic('updateToV4', {'skip-logs': true}, host);
        const result = tree.readContent(`test/app/test.template.${body.type}`);

        console.log(result);

        console.log('receiving data ...');
        console.log('body is ', req.body);

        res.send({
            result: result,
        });

        resetActiveProject();
    } catch (error) {
        res.send({
            error: error.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;
