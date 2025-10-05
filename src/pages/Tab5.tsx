import { IonToast, IonList, IonItem, IonThumbnail, IonLabel, IonIcon, IonFab, IonFabButton, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { home } from 'ionicons/icons';
import './Tabs.css';
import { usercreds } from '../data/userCreds';
import { add } from 'ionicons/icons';
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useHistory } from 'react-router-dom';
import { logoutUser } from '../firebaseConfig';
import { useState, useEffect } from 'react';

const Tab5: React.FC = () => {
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState<"success" | "danger">("success");
  const [showToast, setShowToast] = useState(false);
  const history = useHistory();
  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log("No user document found in Firestore!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.log("No user logged in!");
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="assets/favicon.png"
              alt="logo"
              style={{
                width: "40px",
                height: "40px",
                marginBottom: "10px",
                marginLeft: "20px",
              }}
            />
            <IonTitle style={{ marginTop: "5px" }}>
              {userData ? userData.username : "Loading..."}
            </IonTitle>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol>
              {userData && (
                <IonCard className="profile">
                  <IonCardHeader>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <IonThumbnail className="pfp">
                        <img
                          src={userData.pfp}
                          alt="profile picture"
                          style={{ borderRadius: "50%" }}
                        />
                      </IonThumbnail>
                      <div>
                        <IonCardTitle
                          className="profile-name"
                          style={{ marginBottom: "10px" }}
                        >
                          {userData.name}
                        </IonCardTitle>
                        <IonCardSubtitle>{userData.accountType === "student" ? userData.studentid : userData.accountType}</IonCardSubtitle>
                      </div>
                    </div>
                  </IonCardHeader>
                    <IonCardContent>
                      <IonList>
                        <IonItem button routerLink="/manage_events">
                          <IonLabel>Manage Events</IonLabel>
                        </IonItem>
                        <IonItem button routerLink="/department">
                          <IonLabel>Profile Settings</IonLabel>
                        </IonItem>
                        <IonItem button routerLink="/notifications">
                          <IonLabel>Settings</IonLabel>
                        </IonItem>
                        <IonItem button onClick={async () => {
                          const success = await logoutUser();
                          if (success) {
                            if (success) {
                              setToastMessage("You have been logged out.");
                              setToastColor("success");
                              setShowToast(true);
                            history.push("/login"); // redirect to login
                          } else {
                            setToastMessage("Logout failed. Please try again.");
                            setToastColor("danger");
                            setShowToast(true);
                          }
                        }}}>
                          <IonLabel>Logout</IonLabel>
                        </IonItem>
                      </IonList>
                    </IonCardContent>
                  </IonCard>
              )}

            </IonCol>
          </IonRow>
        </IonGrid>
        <IonFab vertical="bottom" horizontal="center" className="home-fab">
						<IonFabButton routerLink="/home" className="home-fab-button">
							<IonIcon icon={home} />
						</IonFabButton>
					</IonFab>

          <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          color={toastColor}
          cssClass="custom-toast"
          />

      </IonContent>
    </IonPage>
  );
};

export default Tab5;
