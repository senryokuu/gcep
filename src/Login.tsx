import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import { auth, db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from 'react';

const Tab5: React.FC = () => {
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
              style={{ width: "40px", height: "40px", marginBottom: "10px", marginLeft: "20px" }}
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
                        <IonCardTitle className="profile-name" style={{ marginBottom: "10px" }}>
                          {userData.name}
                        </IonCardTitle>
                        <IonCardSubtitle>
                          {userData.accountType === "student" ? userData.studentid : userData.accountType}
                        </IonCardSubtitle>
                      </div>
                    </div>
                  </IonCardHeader>
                </IonCard>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab5;
