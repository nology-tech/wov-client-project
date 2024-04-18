import { render } from '@testing-library/react';
import Popup from './Popup';

describe('Popup', () => {
  it('renders the Popup component', () => {
    const { getByTestId } = render(
      <Popup
        heading="Test Popup"
        labelButtonOne="Button One"
        labelButtonTwo="Button Two"
        descriptionShown={true}
      />
    );
    expect(getByTestId('popup')).toBeInTheDocument();
  });

  it("displays the correct heading", () => {
    const { getByText } = render(
      <Popup
        heading="Test Popup"
        labelButtonOne="Button One"
        labelButtonTwo="Button Two"
        descriptionShown={true}
      />
    );
    expect(getByText("Test Popup")).toBeInTheDocument();
  });

  it("renders the description input when descriptionShown is true", () => {
    const { getByTestId } = render(
      <Popup
        heading="Test Popup"
        labelButtonOne="Button One"
        labelButtonTwo="Button Two"
        descriptionShown={true}
      />
    );
    expect(getByTestId("description-label")).toBeInTheDocument();
  });

  it("doesnt render the description input when descriptionShown is false", () => {
    const { getByTestId } = render(
      <Popup
        heading="Test Popup"
        labelButtonOne="Button One"
        labelButtonTwo="Button Two"
        descriptionShown={false}
      />
    );
    expect(getByTestId("popup")).not.toHaveTextContent("Description:");
  });
})