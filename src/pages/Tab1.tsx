import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';

const events = [
  {
    title: "Event 1",
    date: "May 3, 2025",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lacus urna, faucibus sed fermentum nec, semper ut mauris. Sed ac semper nibh.",
    image: "/resources/splash.png",
  },
  {
    title: "Event 2",
    date: "May 4, 2025",
    description: "Nulla volutpat, velit ac mattis maximus, nisl mauris efficitur leo, luctus consequat lectus felis nec tellus. Proin sapien metus, dignissim id lorem non, mattis placerat lacus.",
    image: "/resources/sample1.jpg",
  },
  {
    title: "Event 3",
    date: "May 5, 2025",
    description: "In iaculis vestibulum mi at elementum. Maecenas scelerisque, leo quis vestibulum tincidunt, felis mauris bibendum arcu, luctus blandit tellus velit et sem.",
    image: "/resources/sample2.jpg",
  },
];

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonRow>
            <IonCol>
              {events.map((event, index) => (
                <IonCard key={index} className="post">
                  <img src={event.image} alt={event.title} style={{height: '250px', width: '100%', objectFit: 'cover'}}/>
                  <IonCardHeader>
                    <IonCardTitle>{event.title}</IonCardTitle>
                    <IonCardSubtitle>{event.date}</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>{event.description}</IonCardContent>
                  <IonButton fill="clear">Sign up</IonButton>
                </IonCard>
              ))}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
