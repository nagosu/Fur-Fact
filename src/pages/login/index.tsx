import { useState, ChangeEvent, useEffect } from 'react';
import Input from '../../components/common/Input';
import { Link, useNavigate } from 'react-router-dom';
import FullButton from '../../components/common/FullButton';
import useAuthStore from '../../store/useAuthStore';
import { baseInstance } from '../../api/config';
import { registerServiceWorker } from '../../utils/notification';
import { getFCMToken } from '../../firebase';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isIdValid, setIsIdValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const navigate = useNavigate();
  const { setToken,token } = useAuthStore();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, []);

  const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setId(value);
    setIsIdValid(value.length >= 5);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setIsPasswordValid(value.length >= 6);
  };

  const handleLogin = async () => {
    try {
      const response = await baseInstance.post(`/users/login`, {
        email: id,
        password: password,
      });
      alert(response)
      console.log(response);
      if (response.status === 200) {
        alert('로그인 되었습니다!');
        setToken(response.data.access_token);
        registerServiceWorker();
        requestNotificationPermission(response.data.access_token);
        navigate('/');
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        alert('잘못된 이메일 또는 비밀번호');
      } else {
        console.error(error);
        alert(error.message);
      }
    }
  };

  const requestNotificationPermission = async (token:string) => {
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        console.log('Notification permission denied');
        alert("알림 허용을 해주셔야 알림을 받을 수 있습니다.");
      } else {
        console.log('Notification permission granted');
        getFCMToken(token);
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  const isFormValid = isIdValid && isPasswordValid;

  return (
    <section className='flex flex-col h-full justify-center bg-[#FEFEFE]'>
      <div className='flex flex-col h-full font-bold justify-between items-start m-8 mt-16'>
        <div className='flex flex-col items-start'>
          <h1 className='text-5xl leading-[4rem] font-sans'>안녕하세요,</h1>
          <h1 className='text-5xl'>퍼팩트입니다!</h1>
        </div>
        <div>
          <Input placeholder='아이디' value={id} onChange={handleIdChange} />
          <Input
            placeholder='비밀번호'
            type='password'
            value={password}
            onChange={handlePasswordChange}
          />
          <div className='w-full flex flex-row justify-center'>
            <div className='flex flex-row text-xs justify-center'>
              회원이 아니신가요?{' '}
              <Link
                className='text-primary font-bold hover:text-blue-500'
                to='/signup'
              >
                {' '}
                회원가입
              </Link>
            </div>
          </div>
          <div className='w-full flex flex-row justify-center'>
            {/* <div className='flex flex-row text-xs justify-center'>
              수의사 이신가요?{' '}
              <Link
                className='text-primary font-bold hover:text-blue-500'
                to='/vet'
              >
                {' '}
                수의사 페이지
              </Link>
            </div> */}
          </div>
        </div>
        <FullButton onClick={handleLogin} disabled={!isFormValid}>
          로그인
        </FullButton>
      </div>
    </section>
  );
};

export default Login;
