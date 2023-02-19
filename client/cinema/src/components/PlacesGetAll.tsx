import * as React from "react";
import ApiService from "../API/ApiService";
import { IPlaces, IUser } from "../types/types";
import List from "./List";
import PlacesItem from "./PlacesItem";
import "./components.css";
import { toast } from "react-toastify";

interface PlacesGetAllProps {
    places: IPlaces[];
    user: IUser;
}

const PlacesGetAll: React.FC<React.PropsWithChildren<PlacesGetAllProps>> = ({
    places,
    user,
}) => {
    const handleClickPlace = async (item: IPlaces) => {
        try {
            if (!item.occupied) {
                const response = await ApiService.updatedPlaces(item._id, user);
                if (response) {
                    places.forEach(function (element) {
                        if (element._id === item._id) {
                            element.occupied = true;
                            const card = document.getElementById(`${item._id}`);
                            if (card) {
                                card.style.background = "rgba(242, 40, 33, 1)";
                                const cardText =
                                    card.querySelector(".place_text");
                                if (cardText)
                                    cardText.textContent = "Занято вами";
                            }
                        }
                    });
                } else {
                    toast.info("Место уже занято");
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="places">
            <List
                items={places}
                renderItem={(place: IPlaces) => (
                    <PlacesItem
                        onClick={(place) => handleClickPlace(place)}
                        place={place}
                    />
                )}
            />
        </div>
    );
};

export default PlacesGetAll;
