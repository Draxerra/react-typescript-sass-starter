import AppLinkButton from "./AppLinkButton";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("App Link Button", () => {
  it("should match snapshot", () => {
    const linkButton = render(<AppLinkButton to="/">Home</AppLinkButton>, {
      wrapper: Router,
    }).asFragment();
    expect(linkButton).toMatchSnapshot();
  });

  it("should navigate on click", () => {
    render(<AppLinkButton to="/contact">Contact</AppLinkButton>, {
      wrapper: Router,
    });
    const linkButton = screen.getByText("Contact");
    expect(linkButton).not.toHaveClass("app-link-button--active");
    userEvent.click(linkButton);
    expect(linkButton).toHaveClass("app-link-button--active");
  });
});
