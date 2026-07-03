import s from "./styles.module.scss";

// Cities / regions where the company operates — scrolled as an infinite
// carousel. The list is duplicated in the track so the loop is seamless.
const CITIES = [
  "Guayaquil",
  "Mumbai",
  "Hamburg",
  "Grecia",
  "Italia",
  "Israel",
  "Brasil",
  "Perú",
  "Chile",
  "Shanghai",
  "Rotterdam",
  "Mumbai",
  "Hong Kong",
  "Miami",
];

export default function CitiesBar() {
  return (
    <div className={s.bar} aria-hidden="true">
      <div className={s.bar__track}>
        {[...CITIES, ...CITIES].map((city, i) => (
          <span key={i} className={s.bar__item}>
            {city}
          </span>
        ))}
      </div>
    </div>
  );
}
