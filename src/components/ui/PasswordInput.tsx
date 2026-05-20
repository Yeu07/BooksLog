import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export function PasswordInput({
  value,
  onChange,
  placeholder = "Contraseña",
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative w-full">
      <Input
        required
        placeholder={placeholder}
        type={isVisible ? "text" : "password"}
        variant="primary"
        value={value}
        onChange={onChange}
        className="w-full"
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center">
        <Button
          className="focus:outline-none p-2 text-default-400 hover:text-default-600 transition-colors"
          type="button"
          onClick={() => setIsVisible(!isVisible)}
          aria-label="Toggle password visibility"
        >
          {isVisible ? (
            <FiEye className="w-5 h-5" />
          ) : (
            <FiEyeOff className="w-5 h-5" />
          )}
        </Button>
      </div>
    </div>
  );
}
