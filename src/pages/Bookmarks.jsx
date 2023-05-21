import { IonBackButton, IonGrid,IonButton,IonButtons, IonCol, IonContent, IonHeader, IonImg, IonList, IonNote, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { RecipeListItem } from '../components/RecipeListItem';

import { useStoreState } from "pullstate";
import { BookmarkStore } from '../store';
import { getBookmarks } from '../store/Selectors';

const Bookmarks = () => {

	const bookmarks = useStoreState(BookmarkStore, getBookmarks); 

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
								Bookmarks
							</IonButton>
						</IonCol>
						</IonRow>
					</IonGrid>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Bookmarks ({ bookmarks.length })</IonTitle>
					</IonToolbar>
				</IonHeader>

                <IonList>
                    { bookmarks.map((bookmark, index) => {

                        return (
                            <RecipeListItem recipe={ bookmark } key={ `recipe_${ index }` } fromBookmarks={ true } />
                        );
                    })}
                </IonList>

				{ bookmarks.length < 1 &&
                
				<>
					<IonRow className="ion-justify-content-center ion-text-center ion-margin-top ion-padding-top">
						<IonCol size="8">
							<IonText>
								You don't have any bookmarks yet
							</IonText>

							<IonNote>
								<p>When viewing a recipe, press the bookmark icon to add it</p>
							</IonNote>
						</IonCol>
					</IonRow>

					<IonRow className="ion-justify-content-center">
						<IonCol size="8">
							<IonImg src="/assets/bookmark.png" />
						</IonCol>
					</IonRow>
				</>
			}
			</IonContent>
		</IonPage>
	);
};

export default Bookmarks;
