import { toast } from "react-toastify";
import config from "./http.config.json";
import axios from "axios";
import { IPlaces } from "../types/types";

axios.defaults.baseURL = config.apiEndPoint;

export default class ApiService {
    static async addPlaces(count) {
        try {
            const { data } = await axios({
                method: "POST",
                url: `/places/add/${count}`,
            });
            return data;
        } catch (e) {
            toast.error(e);
        }
    }
    static async getAllPlaces() {
        try {
            const { data } = await axios({
                method: "GET",
                url: `/places`,
            });
            return data;
        } catch (e) {
            toast.error(e);
        }
    }

    static async updatedPlaces(id, user) {
        try {
            const { data } = await axios({
                method: "POST",
                url: `/places/${id}`,
                data: {
                    name: user.name,
                    phone: user.phone,
                    occupied: true,
                },
            });
            return data;
        } catch (e) {
            toast.error(e);
        }
    }
}
