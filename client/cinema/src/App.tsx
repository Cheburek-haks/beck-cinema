import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlacesGetAll from "./components/PlacesGetAll";
import PlacesCreated from "./components/PlacesCreated";
import ApiService from "./API/ApiService";
import { IPlaces, IUser } from "./types/types";

function App() {
    const [places, setPlaces] = React.useState<IPlaces[]>([]);
    const [user, setUser] = React.useState<IUser>({
        name: "Ramzan1231",
        email: "islam2_14@mail.ru",
        phone: 8928231322223,
    });
    React.useEffect(() => {
        async function fetchData() {
            try {
                const response = await ApiService.getAllPlaces();
                setPlaces(response);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);
    return (
        <div className="App">
            <div className="container">
                <PlacesCreated setPlaces={setPlaces} />
                <PlacesGetAll places={places} user={user} />
                <ToastContainer />
            </div>
        </div>
    );
}

export default App;
