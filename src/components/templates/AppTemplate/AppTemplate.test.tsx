import AppTemplate from "./AppTemplate";
import { renderWithRedux, screen, waitFor } from "~/utils/renderWithRedux";

import counter from "~/store/counter";

describe("App Template", () => {
  afterEach(() => {
    window.history.pushState({}, "Home Page", "/");
  });

  it("should match snapshot", () => {
    const template = renderWithRedux(<AppTemplate />, {
      reducers: { counter },
    }).asFragment();
    expect(template).toMatchSnapshot();
  });

  it("should display loading page when url is /contact", () => {
    window.history.pushState({}, "Contact Page", "/contact");
    renderWithRedux(<AppTemplate />, {
      reducers: { counter },
    });
    const loading = screen.getByText("Loading...");
    expect(loading).toBeInTheDocument();
  });

  it("should display contact page when url is /contact", async () => {
    window.history.pushState({}, "Contact Page", "/contact");
    renderWithRedux(<AppTemplate />, {
      reducers: { counter },
    });
    await waitFor(() => {
      const contact = screen.getByText("Contact Page");
      expect(contact).toBeInTheDocument();
    });
  });
});
