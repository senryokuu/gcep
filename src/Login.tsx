import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
// import './Login.css';

const Login: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <h1 className='appname'>Gordon College Engagement Platform</h1>
        <div className='loginform-container'>
          <form className='loginform'>
            <IonItem>
              <IonInput placeholder="Username"></IonInput>
            </IonItem>

            <IonItem>
              <IonInput placeholder="Password"></IonInput>
            </IonItem>

              <IonButton routerLink='/home'>Login</IonButton>
              <IonButton routerLink='/register'>Register</IonButton>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;