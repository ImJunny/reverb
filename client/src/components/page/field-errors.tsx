import type { AnyFieldApi } from "@tanstack/react-form";

export default function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <p className="text-destructive mt-1 text-xs">
          {field.state.meta.errors.join(", ")}
        </p>
      ) : null}
    </>
  );
}
