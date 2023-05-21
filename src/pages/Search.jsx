import { IonBackButton, IonItem, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonList, IonNote, IonPage, IonRow, IonSearchbar, IonText, IonTitle, IonToolbar, useIonLoading, useIonViewDidEnter } from "@ionic/react";
import { useState } from "react";
import { useRef } from "react";
import styles from "./Categories.module.css";
import { performSearch } from "../utils";
import { RecipeListItem } from "../components/RecipeListItem";

const Search = () => {

    const searchRef = useRef();
    const [searchResults, setSearchResults] = useState([]);
    const [showLoader, hideLoader] = useIonLoading();

    useIonViewDidEnter(() => {
        searchRef.current.setFocus();
    });

    const search = async () => {
        try {
            showLoader({
                cssClass: "customLoader",
                message: "Chef GPT is thinking...",
                duration: 9999999,
                spinner: "dots"
            });

            const searchTerm = searchRef.current.value;
            const data = await performSearch(searchTerm);

            if (data && data.text) {
                setSearchResults([{ text: data.text }]);
            } else {
                // Handle the case where no results were returned from the API
                setSearchResults([]);
            }
        } catch (error) {
            console.error(error);
            // Consider adding error handling here.
        } finally {
            setTimeout(() => {
                hideLoader();
            }, 300);
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" text="Categories" />
                    </IonButtons>
                    <IonGrid>
                        <IonRow className="toolbar-title-container">
                            <IonCol size="11" className="ion-text-center">
                                <IonButton routerLink="/" fill="clear" className="toolbar-title">
                                    Generate Recipes
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <div className={styles.searchArea}>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="9">
                                <IonSearchbar ref={searchRef} placeholder="Tell chef GPT what you want..." />
                            </IonCol>
                            <IonCol size="3">
                                <IonButton className={styles.searchButton} expand="block" color="main" onClick={search}>Generate</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>

                {searchResults.length > 0 && (
                    <IonList>
                        {searchResults.map((result, index) => (
                            <IonItem key={`result_${index}`}>
                                <pre>{result.text}</pre>
                            </IonItem>
                        ))}
                    </IonList>
                )}

                {searchResults.length < 1 && (
                    <>
                        <IonRow className="ion-justify-content-center ion-text-center ion-margin-top ion-padding-top">
                            <IonCol size="8">
                                <IonText>
                                    Enter ingredients, allergens or any other dietary requirements and let Chef-GPT craft you a recipe
                                </IonText>
                                <IonNote>
                                    <p>Disclaimer: ChefGPT provides recipe suggestions based on the information provided to it. While we strive for accuracy, we cannot guarantee the absence of allergens in any recipes provided. The user is responsible for ensuring that any food consumed is free from allergens and safe to eat. ChefGPT, its creators, and operators, do not accept any liability for any adverse reactions caused by following the recipes or consuming the food prepared. Please consult a medical professional if you have any concerns about specific ingredients or allergens.</p>
                                </IonNote>
                            </IonCol>
                        </IonRow>
                        <IonRow className="ion-justify-content-center">
                            <IonCol size="8">
                                <IonImg src="/assets/placeholder.png" />
                            </IonCol>
                        </IonRow>
                    </>
                )}
            </IonContent>
        </IonPage>
    );
}

export default Search;
