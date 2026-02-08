import Location from "../../components/weather/location";

export default function LocationList({locationIds = []}) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)",gap: "10px" }}>
            {locationIds.map((id) => (
                <Location 
                    key={id}
                    id={id}
                />
            ))}
        </div>
    );
}