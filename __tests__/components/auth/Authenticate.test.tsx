import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import Authenticate from "../../../src/components/auth/Authenticate";
import { BrowserRouter } from "react-router-dom";

const mockStore = configureStore([thunk]);

describe("Authenticate component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Provider store={mockStore({})}>
          <Authenticate />
        </Provider>
      </BrowserRouter>
    );
  });

  it("renders 'Log in' text, email, password fields", () => {
    const heading = screen.getByRole("heading", { name: "Log in", level: 3 });
    const userNameInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmpasswordInput = screen.queryByLabelText("Confirm password");

    expect(heading).toBeInTheDocument();
    expect(userNameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmpasswordInput).not.toBeInTheDocument();
  });

  it("renders 'Sign up' text, email, password, confirmpassword fields", () => {
    const switchButton = screen.getByRole("button", {
      name: "Sign up",
    });

    fireEvent.click(switchButton);

    const heading = screen.getByRole("heading", { name: "Sign up", level: 3 });
    const userNameInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmpasswordInput = screen.queryByLabelText("Confirm password");

    expect(heading).toBeInTheDocument();
    expect(userNameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmpasswordInput).toBeInTheDocument();
    expect(switchButton).toHaveTextContent("Log in");
  });
});
