import { useRecoilValue } from "recoil";
import { basketState } from "state/recoilState";


const BasketPage = () => {

  const basket = useRecoilValue(basketState);

  return (
    <div>

    </div>
  );
};

export default BasketPage;