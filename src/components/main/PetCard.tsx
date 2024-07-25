import { useEffect, useState } from "react";
import useModalStore from "../../store/useEditModeStore";
import PetInfoCard from "./PetInfoCard";
import PetInspectionCard from "./PetInspectionCard";
import axios from "axios";
import useAuthStore from "../../store/useAuthStore";
import { PetData } from "../../types";
import { useNavigate } from "react-router-dom";


const PetCard = ({ data, HandleModal }: { data: PetData, HandleModal: (show: boolean) => void }) => {
  const [age, setAge] = useState(data.age);
  const [weight, setWeight] = useState(data.weight);
  const [gender, setGender] = useState(data.gender);
  const [species, setSpecies] = useState(data.species);
  const [img, setImg] = useState(data.image);
  const [name, setName] = useState(data.name);
  const { token } = useAuthStore();
  const { isEdit, unSetEdit } = useModalStore();

  const navigate = useNavigate();


  const HandleSaveEditData = async () => {
    await putPetData();
    unSetEdit();
  };

  const putPetData = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/v1/pets/${data.id}`, {
        name,
        age,
        weight,
        gender,
        species,
        imgUrl: img,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      if (response.status === 200) {
        console.log("성공");
      } else {
        console.log("실패");
      }
    } catch (error) {
      console.error( error);
    }
  };

  useEffect(() => {
    console.log(data);
    setAge(data.age);
    setWeight(data.weight);
    setGender(data.gender);
    setSpecies(data.species);
    setImg(data.image);
    setName(data.name);
  }, [data]);


  const  inspectionData = [
    {
      id: 1,
      petName: "두부",
      age: "비비",
    }
  ]
  // const [ inspectionDatas, setInspectionDatas ] = useState([]);

  // useEffect(() => {
  //   getInspectionData();
  // }, []);

  // const getInspectionData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:3000/api/v1/tests/vet/search?&petName=${name}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         }
  //       }

  //     );
  //     if (response.status === 200) {
  //       setInspectionDatas(response.data.data);
  //     }
  //   } catch (error) {
  //     console.error('데이터 요청 중 에러가 발생했습니다.', error);
  //     console.log(name)
  //   }
  // };


  return (
    <div className="w-full flex flex-col items-center">
      <div
        className="relative flex flex-row w-[357px] h-[320px] bg-cover bg-center rounded-3xl m-2 p-2"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="flex flex-row w-full h-10 justify-between relative z-10">
          <div className="font-bold text-xl rounded-2xl opacity-80 bg-white px-4 py-2">
            {name}
          </div>
          {isEdit ? (
            <button onClick={HandleSaveEditData}>
              저장
            </button>
          ) : (
            <button onClick={() => HandleModal(true)}>
              설정
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-row justify-between w-[350px] m-2">
        <PetInfoCard type="나이" unit="살"  value={age}  />
        <PetInfoCard type="성별" value={gender}  />
        <PetInfoCard type="종"  value={species}  />
        <PetInfoCard type="몸무게" unit="kg"  value={weight}  />
      </div>
      <div className="w-full font-bold text-left m-2">
        검사 결과
      </div>
      <div className="h-[480px] overflow-scroll">
        {inspectionData.map((inspection) => (
          <PetInspectionCard key={inspection.id} number={inspection.id} onClick={()=>navigate('/result/1')}  />
        ))}
      </div>
    </div>
  );
};

export default PetCard;
