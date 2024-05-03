import { render, screen } from '@testing-library/react';
import UserTile from "./UserTile";

describe("User Tile component", () => {
    
    it("Should render the user tile on page", () => {
        const { container } = render(
          <UserTile
            image="../../public/assets/images/default-profile-image.png"
            name="Bob Maa" 
            points={5}
            tribe="vikings" 
            memberSince={2015}
          />
        );
  
        expect(container.firstChild).toHaveClass("user-tile");
    });

    it("Should render the user tile image on page", () => {

        render(
            <UserTile
              image="../../public/assets/images/default-profile-image.png"
              name="Bob Maa" 
              points={5}
              tribe="vikings" 
              memberSince={2015}
            />
        );

        const showImage = screen.getByRole('img', { name: 'profile Image' });
        expect(showImage).toBeInTheDocument();

    });

    it("Should render the correct headings for name, points, tribe and member since", () => {
        
        render(
            <UserTile
              image="../../public/assets/images/default-profile-image.png"
              name="Bob Maa" 
              points={5}
              tribe="vikings" 
              memberSince={2015}
            />
        );

        const name = screen.getByText("Name: Bob Maa");
        const points = screen.getByText("Points: 5");
        const tribe = screen.getByText("Current Tribe: vikings");
        const memberSince = screen.getByText("Member since: 2015");

        expect(name).toBeInTheDocument();
        expect(points).toBeInTheDocument();
        expect(tribe).toBeInTheDocument();
        expect(memberSince).toBeInTheDocument();
    });

});