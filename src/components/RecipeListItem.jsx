import { IonItem, IonLabel } from "@ionic/react";
import { Link } from "react-router-dom";
import styles from "./RecipeListItem.module.css";

export const RecipeListItem = ({ recipe, fromSearch = false, fromBookmarks = false }) => {

    // Path to your local placeholder image.
    const placeholderImageUrl = "/assets/placeholder.png";

    return (
        <Link to={{ pathname: `/recipe/${ recipe.label.replace(" ", "").toLowerCase() }`, state: { recipe, fromSearch, fromBookmarks }}}>
            <IonItem detail={ true } lines="full" className={ styles.categoryItem }>
                                                
                <img src={ recipe.image || placeholderImageUrl } alt="cover" className={ styles.categoryImage } />

                <IonLabel className={ styles.categoryDetails }>
                    <h2>{ recipe.label }</h2>
                    <p>{ recipe.dishType && recipe.dishType[0] }</p>
                </IonLabel>
            </IonItem>
        </Link>
    );
};
