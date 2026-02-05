import Location from "../../components/weather/location";

export default function LocationList({locationIds = []}) {
    return (
        <div style={{ display: "flex", gap: "10px" }}>
            {locationIds.map((id) => (
                <Location 
                    key={id}
                    id={id}
                />
            ))}
        </div>
    );
}