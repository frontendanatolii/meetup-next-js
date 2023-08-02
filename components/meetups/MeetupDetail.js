import classes from './MeetupDetail.module.css';

export const MeetUpDetail = (props) => {
  return (
    <section className={classes.container}>
      <img src={props.imageUrl} alt={props.title} />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </section>
  )
}