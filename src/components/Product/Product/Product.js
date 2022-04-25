import { useEffect } from "react";
import { getSpecificProd } from "../../../actions/product";
import "./Product.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../Design/Loading/Loading";
import SendNotif from "../../../utils/SendNotif";

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading, error } = useSelector((state) => state.product);
  const { _id } = useParams();
  useEffect(() => {
    if (!product) dispatch(getSpecificProd(_id));
    // console.log(error, product);
    if (error) {
      navigate("/");
      dispatch(SendNotif("error", error));
    }
  }, [dispatch, product, error, navigate]);
  return (
    <>
      <Loading show={loading} />
      {product && (
        <div>
          <img
            src={product.images[product.thumbnail].url}
            alt="///"
            className="prodImg"
          />
        </div>
      )}
    </>
  );
};

export default Product;
