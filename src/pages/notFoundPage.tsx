import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="not_found_page">
      <p>
        Возможно я где то неправильно указал путь, простите, но на всякий случай
        я сделал эту страницу
      </p>
      <Link to={"/test_task/products/"}>
        <button>🔙</button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
