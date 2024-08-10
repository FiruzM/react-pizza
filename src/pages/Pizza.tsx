import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Pizza() {
  const [item, setItem] = useState<{
    title: string;
    imageUrl: string;
    price: number;
  }>();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPIzza = async () => {
      try {
        const { data } = await axios.get(
          "https://65f191b8034bdbecc7630e6a.mockapi.io/items/" + params.id
        );
        setItem(data);
      } catch (error: any) {
        alert(error.message);
        navigate("/");
      }
    };
    fetchPIzza();
  }, [params.id, navigate]);

  if (!item) {
    return <>Загрузка...</>;
  }

  return <div>{item?.title}</div>;
}

export default Pizza;
