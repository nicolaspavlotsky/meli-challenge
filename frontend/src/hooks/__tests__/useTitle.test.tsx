import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import useTitle from "../useTitle";

vi.mock("@/constants/app", () => ({
  APP_TITLE: "My Awesome App",
}));

const TestComponent = ({ title }: { title?: string }) => {
  useTitle(title);
  return <div>Test Component</div>;
};

describe("useTitle", () => {
  let originalTitle: string;

  beforeEach(() => {
    originalTitle = document.title;
    document.title = "";
  });

  afterEach(() => {
    document.title = originalTitle;
  });

  describe("hook behavior", () => {
    it("sets document title to APP_TITLE when no title is provided", () => {
      renderHook(() => useTitle());

      expect(document.title).toBe("My Awesome App");
    });

    it("sets document title to APP_TITLE when title is undefined", () => {
      renderHook(() => useTitle(undefined));

      expect(document.title).toBe("My Awesome App");
    });

    it("sets document title to APP_TITLE when title is empty string", () => {
      renderHook(() => useTitle(""));

      expect(document.title).toBe("My Awesome App");
    });

    it("sets document title with custom title when title is provided", () => {
      renderHook(() => useTitle("Dashboard"));

      expect(document.title).toBe("Dashboard | My Awesome App");
    });

    it("updates document title when title prop changes", () => {
      const { rerender } = renderHook(
        ({ title }: { title?: string }) => useTitle(title),
        { initialProps: { title: "Home" } }
      );

      expect(document.title).toBe("Home | My Awesome App");

      rerender({ title: "Profile" });
      expect(document.title).toBe("Profile | My Awesome App");
    });

    it("resets to APP_TITLE when title changes from truthy to falsy", () => {
      const { rerender } = renderHook(
        ({ title }: { title?: string }) => useTitle(title),
        { initialProps: { title: "Settings" as string | undefined } }
      );

      expect(document.title).toBe("Settings | My Awesome App");

      rerender({ title: undefined });
      expect(document.title).toBe("My Awesome App");
    });
  });

  describe("component integration", () => {
    it("works correctly when used in a component without title", () => {
      render(<TestComponent />);

      expect(document.title).toBe("My Awesome App");
    });

    it("works correctly when used in a component with title", () => {
      render(<TestComponent title="About Us" />);

      expect(document.title).toBe("About Us | My Awesome App");
    });

    it("updates title when component props change", () => {
      const { rerender } = render(<TestComponent title="Contact" />);

      expect(document.title).toBe("Contact | My Awesome App");

      rerender(<TestComponent title="FAQ" />);
      expect(document.title).toBe("FAQ | My Awesome App");
    });

    it("handles component unmounting gracefully", () => {
      const { unmount } = render(<TestComponent title="Temporary Page" />);

      expect(document.title).toBe("Temporary Page | My Awesome App");

      unmount();
      expect(document.title).toBe("Temporary Page | My Awesome App");
    });
  });

  describe("edge cases", () => {
    it("handles special characters in title", () => {
      renderHook(() => useTitle("Welcome 🎉 & Hello!"));

      expect(document.title).toBe("Welcome 🎉 & Hello! | My Awesome App");
    });

    it("handles very long titles", () => {
      const longTitle = "A".repeat(100);
      renderHook(() => useTitle(longTitle));

      expect(document.title).toBe(`${longTitle} | My Awesome App`);
    });
  });
});
