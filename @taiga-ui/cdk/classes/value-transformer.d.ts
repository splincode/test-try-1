export declare abstract class TuiValueTransformer<From, To = unknown> {
    abstract toControlValue(componentValue: From): To;
    abstract fromControlValue(controlValue: To): From;
}
