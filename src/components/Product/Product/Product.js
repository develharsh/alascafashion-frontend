import { useEffect, useState } from "react";
import { getSpecificProd } from "../../../actions/product";
import "./Product.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../Design/Loading/Loading";
import SendNotif from "../../../utils/SendNotif";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading, error } = useSelector((state) => state.product);
  const { _id } = useParams();
  useEffect(() => {
    if (!product) dispatch(getSpecificProd(_id));
    // console.log(product);
    if (error) {
      navigate("/");
      dispatch(SendNotif("error", error));
    }
  }, [dispatch, product, error, navigate]);
  const [size, setSize] = useState(null);
  const [colour, setColour] = useState(null);
  const handleChipClick = (idx, key) => {
    if (key === "Size") {
      setSize(idx === size ? null : idx);
      alert(
        `${idx === size ? "Deselected" : "Selected"} ${key}: ${
          product.sizes[idx]
        }`
      );
    } else {
      setColour(idx === colour ? null : idx);
      alert(
        `${idx === colour ? "Deselected" : "Selected"} ${key}: ${
          product.colours[idx]
        }`
      );
    }
  };
  return (
    <>
      <Loading show={loading} />
      <div className="productHeight"></div>
      {product && (
        <div>
          <div className="dFlex justfycent productBread">
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                underline="hover"
                color="inherit"
                href={`/products?category=${product.category._id}`}
              >
                {product.category.title}
              </Link>
              <Link
                underline="hover"
                color="inherit"
                href={`/products?subcategory=${product.subcategory._id}`}
              >
                {product.subcategory.title}
              </Link>
              <Typography color="text.primary">{product.title}</Typography>
            </Breadcrumbs>
          </div>
          <div className="dFlexWrap justfyeven">
            <img
              src={product.images[product.thumbnail].url}
              alt="///"
              className="prodImg"
              title={product.description}
            />
            <div className="productDetails">
              <p className="productTitle">{product.title}</p>
              <p className="productDesc">{product.description}</p>
              <p className="productCosts">
                <span className="productCosts-1">₹ {product.disCost}</span>
                <span className="productCosts-2">
                  <del>₹ {product.cost}</del>
                </span>
                <span className="productCosts-3">
                  {Math.ceil(100 - (product.disCost * 100) / product.cost)}% off
                </span>
              </p>
              {product.sizes.map((each, idx) => (
                <Chip
                  key={idx}
                  color="primary"
                  label={each}
                  sx={{ m: 1 }}
                  variant={idx === size ? "contained" : "outlined"}
                  onClick={() => handleChipClick(idx, "Size")}
                />
              ))}
              <br></br>
              {product.colours.map((each, idx) => (
                <Chip
                  key={idx}
                  sx={{
                    border: `3px solid ${each}`,
                    m: 1,
                    background: `${idx === colour ? each : ""}`,
                  }}
                  label={each}
                  variant={idx === colour ? "contained" : "outlined"}
                  onClick={() => handleChipClick(idx, "Colour")}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
