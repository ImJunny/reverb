import { AlertCircle } from "lucide-react";

export function FormErrorList({ errors }: { errors: string[] }) {
  if (errors.length === 0) return null;
  return (
    <ul className="mt-2 mb-3 flex flex-col space-y-2">
      {errors.map((e, idx) => (
        <li
          key={idx}
          className="text-foreground bg-destructive text-xxs flex items-center space-x-2 rounded-xs p-1 px-2"
        >
          <AlertCircle size={16} />
          <p>{e}</p>
        </li>
      ))}
    </ul>
  );
}
