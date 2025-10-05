import { IonLabel, IonButton, IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { loginUser, db } from './firebaseConfig';
import { doc, getDoc } from "firebase/firestore";
import { useState } from 'react';
import { useHistory } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState<"success" | "danger">("success");
  const [showToast, setShowToast] = useState(false);
  const history = useHistory();

  async function login() {
    if (email.trim() === '' || password.trim() === '') {
      setToastMessage("Please fill out all fields.");
      setToastColor("danger");
      setShowToast(true);
      return;
    }

    try {
      const user = await loginUser(email, password);
  
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const userData = docSnap.data();
          console.log("User type:", userData.accountType);
  
          if (userData.accountType === "admin" || userData.accountType === "organizer") {
            setToastMessage(`Welcome back, ${user.email}! (Organizer)`);
            setToastColor("success");
            setShowToast(true);
            setTimeout(() => {
              history.push("/admin");
            }, 1500);
          } else {
            setToastMessage(`Welcome back, ${user.email}!`);
            setToastColor("success");
            setShowToast(true);
            setTimeout(() => {
              history.push("/home");
            }, 1500);
          }
        } else {
          console.warn("No user document found in Firestore!");
        }
      }
    } catch (error: any) {
      setToastMessage("Invalid email or password");
      setToastColor("danger");
      setShowToast(true);
    
      console.error("Firebase login error:", error.code, error.message);
    }
  }
  
  return (
    <IonPage>
      <IonContent className='ion-padding auth-background' scrollY={false}>
        <h1 className='appname'>Gordon College Engagement Platform</h1>
        <div className='loginform-container'>
          <form className='loginform'>
          <h1 className='logreg_title'>Login</h1>

          <IonLabel>Email</IonLabel>
            <IonItem>
              <IonInput
                placeholder="Email"
                value={email}
                onIonInput={(e) => setEmail(e.detail.value!)}
              />
            </IonItem>

            <IonLabel>Password</IonLabel>
            <IonItem>
              <IonInput 
                type="password"
                placeholder="Password"
                value={password}
                onIonInput={(e) => setPassword(e.detail.value!)}
              />
            
            </IonItem>
              <IonButton onClick={login}>Login</IonButton>
              <IonButton routerLink='/register'>Register</IonButton>
              <IonButton routerLink='/forgot' fill="clear" color="primary">Forgot Password?</IonButton>
          </form>
        </div>

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

export default Login;