import React, { useEffect, useState } from "react";
import vectorIcon from "../../assets/vectorIcon.svg";
import ButtonWarningSmall from "../Buttons/ButtonWarningSmall";
import SpinnersDelete from "../Spinners/SpinnersDelete";
import SpinnersPrimary from "../Spinners/SpinnersPrimary";
import NotFound from "../NotFound/NotFound";
import { getBenefits } from "../../helpers/Benefits/getBenefits";
import { deleteBenefits } from "../../helpers/Benefits/deleteBenefits";
interface BenefitsItem {
  address: string;
  name: string;
  benefits: string;
  benefitEndDate: string;
  description: string;
  logo: string;
  id:number;
}

const BenefitsComponent = () => {
  const [page, setPage] = useState (1)
  const [message, setMessage] = useState ("")
  const [totalPages, setTotalPages] = useState (3)
  const [benefits, setBenefits] = useState<BenefitsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchBenefits = async (page: number) => {
      const newsData = await getBenefits(3,page);
      setBenefits(newsData.data);
      setMessage(newsData.message);
      setTotalPages(Math.ceil(newsData.total/3));
      setIsLoading(false);
    };
    fetchBenefits(page);
  }, [page]);

  const onClic = async (id: any): Promise<void> => {
    console.log("Eliminando noticia con ID:", id);
    setDeletingId(id);
    setIsDeleting(true);

    await deleteBenefits(id);

    setTimeout(() => {
      setBenefits(benefits.filter((item) => item.id !== id));
      setIsDeleting(false);
      setDeletingId(null);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center h-full flex-col">
      {isLoading ? (
        <div className="flex items-center justify-center">
        <SpinnersPrimary />
        </div>
      ) : message ==="No se encontraron noticias en esta pagina" ? (
        <NotFound />
      ) : (
        <ul className=" w-full">
          {benefits.map(({ logo, name, address, benefits, benefitEndDate, id }) => (
            <>
              <li
                key={id}
                className="flex flex-row flex-nowrap justify-between pr-10 items-center"
              >
                <a
                  className="flex flex-row justify-between p-10 items-center text-sm w-full"
                  id={`card${id}`}
                  href={`/news/DinamicNew/${name}`}
                >
                  <div className="flex">
                    <img
                      src={logo}
                      alt={name}
                      className="w-20 h-20 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h6 className="text-tertiary text-base font-semibold">
                        {name}
                      </h6>
                      <p>{address}</p>
                      <p>{benefits}</p>
                    </div>
                  </div>
                  <div>
                    <p>{benefitEndDate}</p>
                  </div>
                  <img src={vectorIcon.src} alt="icono de vector" />
                </a>
                <div className="w-40 flex justify-center">
                  {isDeleting && deletingId === id ? (
                    <SpinnersDelete />
                  ) : (
                    <ButtonWarningSmall
                      title="Eliminar"
                      idEvent={`delete-${id}`}
                      onClick={() => onClic(id)}
                    />
                  )}
                </div>
              </li>
              <hr />
              
            </>
          ))}
          <div className="flex items-center justify-center flex-row w-full mt-8">
              <div  className="rounded-lg w-12 h-12  flex items-center justify-center border border-backgroundGrey hover:bg-gray-300">
                <button onClick={()=>(page > 1) && setPage(page - 1)} className="w-full h-full font-medium text-xl">{"<"}</button>
              </div>
                <p className=" font-base text-lg mx-4">{page}/{totalPages}</p>
              <div  className="rounded-lg w-12 h-12  flex items-center justify-center border border-backgroundGrey hover:bg-gray-300">
                <button onClick={()=>(page >= totalPages) && setPage(page + 1)} className="w-full h-full font-medium text-xl">{">"}</button>
              </div> 
          </div>
        </ul>
      )}
      
    </div>
  );
};

export default BenefitsComponent;
