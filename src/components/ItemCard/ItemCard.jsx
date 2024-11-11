import "./ItemCard.css";
function ItemCard({ item, onCardClick } ) {
        const handleCardClick = () => {
            onCardClick(item);
        }
        return (
            <div className="card" key={item._id}>
                <h2 className="card__title">{item.name}</h2>
                <img onClick={handleCardClick} className="card__img" src={item.link} alt={item.name} />
            </div>
        )
}

export default ItemCard;