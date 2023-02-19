import * as React from "react";
import { toast } from "react-toastify";
import ApiService from "../API/ApiService";
import { IPlaces } from "../types/types";
interface PlacesCreatedProps {
    setPlaces: React.Dispatch<React.SetStateAction<IPlaces[]>>;
}

const PlacesCreated: React.FC<React.PropsWithChildren<PlacesCreatedProps>> = ({
    setPlaces,
}) => {
    const [count, setCount] = React.useState<number>(0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCount(Number(e.target.value));
    };
    const handleClick = async () => {
        try {
            if (count < 100) {
                const response = await ApiService.addPlaces(count);
                if (response) {
                    setPlaces(response.data);
                }
            } else {
                toast.info(
                    `Вашее число - "${count}" превышает максимальное количество мест`
                );
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="places_created">
            <input
                className="places_created_input"
                type="number"
                max={100}
                placeholder="Введите число мест"
                value={count}
                onChange={handleChange}
            />
            <button className="places_created_button" onClick={handleClick}>
                Создать места
            </button>
        </div>
    );
};

export default PlacesCreated;
