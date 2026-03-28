interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const validateField = (name: string, value: string): string | undefined => {
  switch (name) {
    case "name":
      if (!value.trim()) return "Name is required";
      if (value.trim().length < 2) return "Name must be at least 2 characters";
      return undefined;
    case "email":
      if (!value.trim()) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email";
      return undefined;
    case "message":
      if (!value.trim()) return "Message is required";
      if (value.trim().length < 10) return "Message must be at least 10 characters";
      return undefined;
    default:
      return undefined;
  }
};

const validateForm = (formData: Record<string, string>): FormErrors => {
  const errors: FormErrors = {};
  
  Object.keys(formData).forEach((key) => {
    if (["name", "email", "message"].includes(key)) {
      const error = validateField(key, formData[key]);
      if (error) errors[key as keyof FormErrors] = error;
    }
  });
  
  return errors;
};

describe("Form Validation", () => {
  describe("validateField", () => {
    describe("name field", () => {
      it("should return error for empty name", () => {
        expect(validateField("name", "")).toBe("Name is required");
      });

      it("should return error for whitespace-only name", () => {
        expect(validateField("name", "   ")).toBe("Name is required");
      });

      it("should return error for single character name", () => {
        expect(validateField("name", "J")).toBe("Name must be at least 2 characters");
      });

      it("should return undefined for valid name", () => {
        expect(validateField("name", "John")).toBeUndefined();
      });

      it("should return undefined for two character name", () => {
        expect(validateField("name", "Jo")).toBeUndefined();
      });
    });

    describe("email field", () => {
      it("should return error for empty email", () => {
        expect(validateField("email", "")).toBe("Email is required");
      });

      it("should return error for whitespace-only email", () => {
        expect(validateField("email", "   ")).toBe("Email is required");
      });

      it("should return error for invalid email format", () => {
        expect(validateField("email", "invalid")).toBe("Please enter a valid email");
      });

      it("should return error for email without domain", () => {
        expect(validateField("email", "test@")).toBe("Please enter a valid email");
      });

      it("should return error for email without @", () => {
        expect(validateField("email", "testexample.com")).toBe("Please enter a valid email");
      });

      it("should return undefined for valid email", () => {
        expect(validateField("email", "test@example.com")).toBeUndefined();
      });

      it("should return undefined for email with subdomain", () => {
        expect(validateField("email", "test@mail.example.com")).toBeUndefined();
      });
    });

    describe("message field", () => {
      it("should return error for empty message", () => {
        expect(validateField("message", "")).toBe("Message is required");
      });

      it("should return error for whitespace-only message", () => {
        expect(validateField("message", "   ")).toBe("Message is required");
      });

      it("should return error for message less than 10 characters", () => {
        expect(validateField("message", "Hello")).toBe("Message must be at least 10 characters");
      });

      it("should return undefined for message with exactly 10 characters", () => {
        expect(validateField("message", "Hello12345")).toBeUndefined();
      });

      it("should return undefined for valid message", () => {
        expect(validateField("message", "This is a valid message")).toBeUndefined();
      });
    });

    describe("unknown field", () => {
      it("should return undefined for unknown field", () => {
        expect(validateField("phone", "1234567890")).toBeUndefined();
      });

      it("should return undefined for subject field", () => {
        expect(validateField("subject", "General Inquiry")).toBeUndefined();
      });
    });
  });

  describe("validateForm", () => {
    it("should validate all required fields", () => {
      const formData = {
        name: "",
        email: "",
        message: "",
      };

      const errors = validateForm(formData);

      expect(errors).toHaveProperty("name");
      expect(errors).toHaveProperty("email");
      expect(errors).toHaveProperty("message");
    });

    it("should return no errors for valid form data", () => {
      const formData = {
        name: "John Doe",
        email: "john@example.com",
        message: "This is a valid message",
        phone: "",
        subject: "",
      };

      const errors = validateForm(formData);

      expect(Object.keys(errors)).toHaveLength(0);
    });

    it("should only validate name, email, and message fields", () => {
      const formData = {
        name: "",
        email: "valid@email.com",
        message: "Valid message here",
        phone: "123",
        subject: "General",
      };

      const errors = validateForm(formData);

      expect(Object.keys(errors)).toHaveLength(1);
      expect(errors).toHaveProperty("name");
    });

    it("should detect multiple validation errors", () => {
      const formData = {
        name: "J",
        email: "invalid",
        message: "short",
      };

      const errors = validateForm(formData);

      expect(Object.keys(errors)).toHaveLength(3);
      expect(errors.name).toBe("Name must be at least 2 characters");
      expect(errors.email).toBe("Please enter a valid email");
      expect(errors.message).toBe("Message must be at least 10 characters");
    });
  });

  describe("Email format edge cases", () => {
    it("should handle email with plus sign", () => {
      expect(validateField("email", "test+tag@example.com")).toBeUndefined();
    });

    it("should handle email with dots", () => {
      expect(validateField("email", "first.last@example.com")).toBeUndefined();
    });

    it("should handle email with numbers", () => {
      expect(validateField("email", "user123@example.com")).toBeUndefined();
    });

    it("should handle email with hyphens", () => {
      expect(validateField("email", "user-name@example.com")).toBeUndefined();
    });

    it("should reject email with spaces", () => {
      expect(validateField("email", "test @example.com")).toBe("Please enter a valid email");
    });

    it("should reject email with double @", () => {
      expect(validateField("email", "test@@example.com")).toBe("Please enter a valid email");
    });
  });

  describe("Name edge cases", () => {
    it("should accept unicode characters", () => {
      expect(validateField("name", "José")).toBeUndefined();
    });

    it("should accept names with spaces", () => {
      expect(validateField("name", "John Doe Smith")).toBeUndefined();
    });

    it("should accept single character names with spaces", () => {
      expect(validateField("name", "J D")).toBeUndefined();
    });
  });
});
