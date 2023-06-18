import { url } from "../url";
import * as storage from "../../features/storage";
export const deleteItem = (stateToUpdate, id, updateState) => {
    const itemToDelete = stateToUpdate.find((item) => item.id === id);
    const indexOfItem = stateToUpdate.indexOf(itemToDelete);
    const clone = [...stateToUpdate];
    clone.splice(indexOfItem, 1);
    storage.save("hostedVenues", clone);
    updateState(clone);
    try {
        fetch(url.venues + id, {
            method: "DELETE",
            headers: {
                Authorization: url.authorization,
            },
        }).then((data) => console.log(data));
    } catch (error) {
        console.log(error);
    }
};
