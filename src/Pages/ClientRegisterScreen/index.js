import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import GenericRegisterScreen from '../../Components/GenericRegisterScreen';
import { validateFields } from '../../Utils/validations';
import ClientForms from '../../Components/ClientForms';
import { useProfileUser } from '../../Context';
import { postClient, getFeatures } from '../../Services/Axios/clientServices';

const ClientRegisterScreen = () => {
  const history = useHistory();
  const [registerClientInputName, setRegisterClientInputName] = useState('');
  const [registerClientInputEmail, setRegisterClientInputEmail] = useState('');
  const [registerClientInputCpf, setRegisterClientInputCpf] = useState('');
  const [registerClientInputAddress, setRegisterClientInputAddress] = useState('');
  const [registerClientInputPhone, setRegisterClientInputPhone] = useState('');
  const [registerClientInputSecondaryPhone, setregisterClientInputSecondaryPhone] = useState('');
  const [inputRegisterClientImage, setRegisterClientInputImage] = useState('');
  const [officeOption, setOfficeOption] = useState('Cargo');
  const [registerLocation, setRegisterLocation] = useState('Lotação');
  const [featuresList, setFeaturesList] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedFeaturesID, setSelectedFeaturesID] = useState([]);
  const [baseImage, setBaseImage] = useState('');
  const { startModal, user } = useProfileUser();

  const getFeaturesFromAPI = () => {
    getFeatures('/features')
      .then((response) => setFeaturesList(response.data));
  };

  useEffect(() => {
    getFeaturesFromAPI();
  }, []);

  const submit = async () => {
    const cpfNoMask = registerClientInputCpf.replaceAll('.', '').replaceAll('-', '');
    const validMessage = validateFields(registerClientInputName,
      registerClientInputEmail, cpfNoMask,
      registerClientInputPhone, registerClientInputSecondaryPhone);
    if (!validMessage.length) {
      const data = await postClient(
        registerClientInputName, registerClientInputEmail,
        cpfNoMask, registerClientInputPhone,
        registerClientInputSecondaryPhone, registerClientInputAddress,
    const phoneNoMask = registerClientInputPhone.replaceAll('(', '').replaceAll(')', '').replaceAll(' ', '').replaceAll('-', '');
    const secondaryPhoneNoMask = registerClientInputSecondaryPhone.replaceAll('(', '').replaceAll(')', '').replaceAll(' ', '').replaceAll('-', '');
    const validMessage = validateFields(registerClientInputName,
      registerClientInputEmail, registerClientInputCpf,
      phoneNoMask, secondaryPhoneNoMask);
    if (!validMessage.length) {
      const data = await postClient(
        registerClientInputName, registerClientInputEmail,
        registerClientInputCpf, phoneNoMask,
        secondaryPhoneNoMask, registerClientInputAddress,
        officeOption, registerLocation, selectedFeaturesID, startModal, user._id, baseImage,
      ).then((response) => response.data);
      if (data) {
        return history.push(`/perfil/${data._id}`);
      }
      return undefined;
    }
    startModal(validMessage.join('\n'));
    return undefined;
  };

  const cancel = () => {
    setRegisterClientInputName('');
    setRegisterClientInputCpf('');
    setRegisterClientInputEmail('');
    setRegisterClientInputPhone('');
    setRegisterClientInputAddress('');
    setOfficeOption('');
    setRegisterLocation('');
  };
  if (!localStorage.getItem('@App:token')) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <GenericRegisterScreen
        sidebarList={[registerClientInputName, registerClientInputCpf,
          registerClientInputAddress, officeOption, registerLocation]}
        sidebarFooter={[registerClientInputEmail, registerClientInputPhone]}
        cancel={cancel}
        submit={submit}
        buttonTitle="Cadastrar"
        inputImage={inputRegisterClientImage}
        setInputImage={setRegisterClientInputImage}
        baseImage={baseImage}
        setBaseImage={setBaseImage}
      >
        <ClientForms
          setInputName={setRegisterClientInputName}
          inputName={registerClientInputName}
          setInputEmail={setRegisterClientInputEmail}
          inputEmail={registerClientInputEmail}
          setInputCpf={setRegisterClientInputCpf}
          inputCpf={registerClientInputCpf}
          setInputPhone={setRegisterClientInputPhone}
          inputPhone={registerClientInputPhone}
          setInputSecondaryPhone={setregisterClientInputSecondaryPhone}
          secondaryPhone={registerClientInputSecondaryPhone}
          setInputAddress={setRegisterClientInputAddress}
          inputAddress={registerClientInputAddress}
          setOfficeOption={setOfficeOption}
          setLocationOption={setRegisterLocation}
          locationOption={registerLocation}
          featuresList={featuresList}
          setSelectedFeatures={setSelectedFeatures}
          selectedFeatures={selectedFeatures}
          setSelectedFeaturesID={setSelectedFeaturesID}
          register
        />
      </GenericRegisterScreen>
    </div>
  );
};

export default ClientRegisterScreen;
