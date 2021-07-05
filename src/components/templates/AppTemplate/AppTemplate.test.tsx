import AppTemplate from "./AppTemplate";
import { renderWithRedux } from "~/utils/renderWithRedux";

import counter from "~/store/counter";

describe("App Template", () => {
  it("should match snapshot", () => {
    const template = renderWithRedux(<AppTemplate />, {
      reducers: { counter },
    }).asFragment();
    expect(template).toMatchSnapshot();
  });
});
