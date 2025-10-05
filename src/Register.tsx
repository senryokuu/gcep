import { IonIcon, IonLabel, IonSelect, IonSelectOption, IonButton, IonInput, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonToast, IonItem } from '@ionic/react';
import { registerUser, db } from './firebaseConfig'
import { doc, setDoc } from "firebase/firestore";
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { arrowBackOutline } from "ionicons/icons";
import './App.css'

const Register: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setcPassword] = useState('')
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState<"success" | "danger">("success");
  const [showToast, setShowToast] = useState(false);
  const [accountType, setAccountType] = useState("");
  const history = useHistory();

  async function register() {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setToastMessage("Please enter a valid email address.");
      setToastColor("danger");
      setShowToast(true);
      return;
    }

    if (password !== cpassword) {
      setToastMessage("Passwords do not match.");
      setToastColor("danger");
      setShowToast(true)
      return
    }

    if (password.length < 6) {
      setToastMessage("Password must be at least 6 characters long.");
      setToastColor("danger");
      setShowToast(true);
      return;
    }

    if(email.trim() === '' || password.trim() === '' ) {
      setToastMessage("Please fill out all fields.");
      setToastColor("danger");
      setShowToast(true);
      return
    }

    try {
      const user = await registerUser(email, password);
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          email: email,
          accountType: accountType, // default for now
        });
  
        setToastMessage("User registered successfully! You may now log in.");
        setToastColor("success");
        setShowToast(true);
        history.push("/login");
      }
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setToastMessage("This email is already registered.");
      } else if (error.code === "auth/invalid-email") {
        setToastMessage("The email address is invalid.");
      } else {
        setToastMessage(error.message || "Registration failed.");
      }
      setToastColor("danger");
      setShowToast(true);

      console.error("Firebase login error:", error.code, error.message);
    }
  }

  return (
    <IonPage>
      <IonContent className='ion-padding auth-background' scrollY={false}>
        <div className='loginform-container'>
          <form className='loginform'>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <IonIcon
              icon={arrowBackOutline}
              className="back-icon"
              onClick={() => history.push("/login")}
            />
            <h1 className='logreg_title'>Register</h1>
          </div>
          
            <IonLabel>E-mail</IonLabel>
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

            <IonLabel>Confirm Password</IonLabel>
            <IonItem>
            <IonInput
              type="password"
              placeholder="Confirm Password"
              value={cpassword}
              onIonInput={(e) => setcPassword(e.detail.value!)}
            />
            </IonItem>

            <IonLabel>Select Account Type</IonLabel>
            <IonItem>
              <IonSelect value={accountType} onIonChange={(e) => setAccountType(e.detail.value)}>
                <IonSelectOption value="student">Student</IonSelectOption>
                <IonSelectOption value="organizer">Event Organizer</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonButton onClick={register}>Register</IonButton>
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

export default Register;

function setErrorMessage(arg0: string) {
  throw new Error('Function not implemented.');
}

