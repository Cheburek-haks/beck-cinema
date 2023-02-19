import * as React from "react";
import { IPlaces } from "../types/types";
import "./components.css";
interface PlacesItemProps {
    place: IPlaces;
    onClick: (place: IPlaces) => void;
}
const PlacesItem: React.FC<React.PropsWithChildren<PlacesItemProps>> = ({
    place,
    onClick,
}) => {
    const handleOccupiedPlacecClasses = () => {
        return place.occupied
            ? "places_item" + " places_item_yes_occupied"
            : "places_item" + " places_item_not_occupied";
    };
    console.log(place);

    return (
        <div
            id={`${place._id}`}
            className={handleOccupiedPlacecClasses()}
            onClick={() => onClick(place)}
        >
            <p className="place_text">
                {place.occupied ? "Занято" : "Не занято"}
            </p>
        </div>
    );
};

export default PlacesItem;
