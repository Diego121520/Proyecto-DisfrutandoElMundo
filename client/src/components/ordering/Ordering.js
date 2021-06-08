import React from 'react';
import styles from './ordering.module.css';


function Ordering() {
    const [showOrderings, setShowOrderings] = React.useState(false);
    const [order, setOrder] = React.useState("");
    const [selectedLi, setSelectedLi] = React.useState(false);
    const [optionSelected, setOptionSelected] = React.useState("");

    function liValue(e) {
        setSelectedLi(!selectedLi);
        if (!selectedLi) {
            e.target.className = styles.liSelected;
        }
        else {
            e.target.className = styles.liDeselected;
        }
        let orderValue = e.target.innerText.replace(" ", "-");

        setOrder(orderValue);
    }

    return (
        <div>
            <button className={styles.btnOrder} onClick={() => setShowOrderings(!showOrderings)}>Ordenar por</button>
            {showOrderings &&
                <div className={styles.containerList}>
                    <ul className={styles.ulList}>

                        <li onClick={liValue}>name Asc</li>
                        <li onClick={liValue}>name Desc</li>
                        <li onClick={liValue}>population Asc</li>
                        <li onClick={liValue}>population Desc</li>

                        {order !== "" && <a href={`/order-by/${order}`}>
                            <button className={styles.button}>Aplicar</button>
                        </a>}
                    </ul>

                </div>}
        </div>
    )
}

export default Ordering;