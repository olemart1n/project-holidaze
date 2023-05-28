import { url } from "../url";
import * as storage from "../../features/storage";
export const deleteItem = (urlFromComponent, stateToUpdate, id, updateState, storageName) => {
    const itemToDelete = stateToUpdate.find((item) => item.id === id);
    const indexOfItem = stateToUpdate.indexOf(itemToDelete);
    const clone = [...stateToUpdate];
    const newValue = clone.splice(indexOfItem, 1);
    console.log(newValue);
    storage.save(storageName, clone);
    updateState(clone);

    fetch(urlFromComponent + id, {
        method: "DELETE",
        headers: {
            Authorization: url.Authorization,
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        });
};
