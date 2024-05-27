import {
  Section,
  TopSection,
  BottomSection,
  MyInfoTitle,
  MyInfoContent,
  MyInfoCareer,
  MyInfocertificate,
  MyInfoText,
  InfoContentTitle,
  InfoContentText,
  InputCareer,
  FirstInfoContentTitle,
  InfoContentLineText,
  MyInfoContentEdit,
} from "./style";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useState, useEffect, Key } from "react";
import {
  viewMyCareerInfo,
  viewMyCareerList,
} from "../../utils/apimodule/article";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { userCareerStateSelector } from "../../utils/recoil/atom";
import { editUserCareerList } from "../../utils/apimodule/member";
import { editUserCareerInfo } from "../../utils/apimodule/member";
import { userCareerUserInfoStateSelector } from "../../utils/recoil/atom";
import { validateCareer } from "../../utils/validations/validation";
import { toast } from "react-toastify";

const MyCareer = () => {
  const setCareerValue = useSetRecoilState(userCareerStateSelector);
  const [userInfoValue, setUserInfoValue] = useRecoilState<any>(
    userCareerUserInfoStateSelector
  );
  const [careerPostState, setCareerPostState] = useState(false);
  const {
    userName,
    userId,
    userDpt,
    userPhoneNumber,
    userLocation,
    userLineText,
  } = useRecoilValue<any>(userCareerUserInfoStateSelector);
  const { userCareer, userCertificate } = useRecoilValue(
    userCareerStateSelector
  );
  const [edit, setEdit] = useState(true);

  const clickEdit = () => {
    setEdit(false);
  };

  const sendCareerEdit = async () => {
    try {
      if (!validateCareer(userCareer, userCertificate)) {
        return;
      }
      let response;

      if (careerPostState) {
        response = await Promise.all([
          editUserCareerList("post", userCareer, userCertificate),
          editUserCareerInfo(
            "post",
            userName,
            userId,
            userDpt,
            userPhoneNumber,
            userLocation,
            userLineText
          ),
        ]);
      } else {
        response = await Promise.all([
          editUserCareerList("put", userCareer, userCertificate),
          editUserCareerInfo(
            "put",
            userName,
            userId,
            userDpt,
            userPhoneNumber,
            userLocation,
            userLineText
          ),
        ]);
      }
      if (response[0].success && response[1].success) {
        toast.success("이력서 수정이 완료되었습니다!");
        setEdit(true);
        window.location.reload();
      } else {
        toast.error("서버연결 안됨!");
      }
    } catch (error) {
      console.log("실패 : ", error);
      toast.error("이력서 수정에 실패했습니다!");
    }
  };

  const userCareerData = async () => {
    try {
      const [careerInfo, careerList] = await Promise.all([
        viewMyCareerInfo(),
        viewMyCareerList(),
      ]);

      const member = careerInfo.data.basicInfos[0].member;
      const career = careerList.data.careers;

      setCareerValue({
        userCareer: career.careers || [],
        userCertificate: career.certifications || [],
      });

      setUserInfoValue({
        userName: member.memberName,
        userId: member.memberId,
        userPhoneNumber: member.memberPhoneNum,
        userDpt: member.memberDpt,
        userLocation: member.memberLocation,
        userLineText: member.memberLineText,
      });

      if (
        career.careers.length > 0 &&
        career.certifications.length > 0 &&
        Object.keys(member).length > 0
      ) {
        setCareerPostState(true);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const addCareerInput = () => {
    setCareerValue((prev) => ({
      ...prev,
      userCareer: [
        ...prev.userCareer,
        {
          id: Date.now(),
          carName: "",
          carStartDay: "",
          carEndDay: "",
        },
      ],
    }));
  };

  const addCertificateInput = () => {
    setCareerValue((prev) => ({
      ...prev,
      userCertificate: [
        ...prev.userCertificate,
        {
          id: Date.now(),
          certName: "",
          certDate: "",
        },
      ],
    }));
  };

  const deleteCertificate = (certificateId: any) => {
    setCareerValue((prev) => ({
      ...prev,
      userCertificate: prev.userCertificate.filter(
        (certificate: any) => certificate.id !== certificateId
      ),
    }));
  };

  const deleteCareer = (careerId: any) => {
    setCareerValue((prev) => ({
      ...prev,
      userCareer: prev.userCareer.filter(
        (career: any) => career.id !== careerId
      ),
    }));
  };

  useEffect(() => {
    userCareerData();
  }, []);

  return (
    <Section>
      <TopSection>
        <MyInfoTitle>
          <div>이력서</div>
        </MyInfoTitle>
        {edit ? (
          <MyInfoContent>
            <FirstInfoContentTitle>
              {userName} @{userId}
            </FirstInfoContentTitle>
            <div></div>

            <div>
              {userPhoneNumber ? (
                <>{userPhoneNumber}</>
              ) : (
                <>등록된 전화번호가 없습니다.</>
              )}
            </div>
            <div>
              {userDpt ? <>{userDpt}</> : <>등록된 학과(학부)가 없습니다.</>}
            </div>
            <div>
              {userLocation ? (
                <>{userLocation}</>
              ) : (
                <>등록된 지역이 없습니다.</>
              )}
            </div>
          </MyInfoContent>
        ) : (
          <>
            <MyInfoContentEdit>
              <FirstInfoContentTitle>
                {userName} {userId}
              </FirstInfoContentTitle>
              <div></div>

              <div>
                {userPhoneNumber
                  ? userPhoneNumber
                  : "등록된 전화번호가 없습니다."}
              </div>
              {userDpt ? (
                <input
                  placeholder={userDpt}
                  value={userInfoValue.userDpt}
                  onChange={(e) => {
                    setUserInfoValue({
                      ...userInfoValue,
                      userDpt: e.target.value,
                    });
                  }}
                />
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="학과를 입력해주세요"
                    value={userInfoValue.userDpt}
                    onChange={(e) => {
                      setUserInfoValue({
                        ...userInfoValue,
                        userDpt: e.target.value,
                      });
                    }}
                  />
                </>
              )}
              {userLocation ? (
                <input
                  placeholder={userLocation}
                  value={userInfoValue.userLocation}
                  onChange={(e) => {
                    setUserInfoValue({
                      ...userInfoValue,
                      userLocation: e.target.value,
                    });
                  }}
                />
              ) : (
                <>
                  <input
                    placeholder="지역을 입력해주세요"
                    value={userInfoValue.userLocation}
                    onChange={(e) => {
                      setUserInfoValue({
                        ...userInfoValue,
                        userLocation: e.target.value,
                      });
                    }}
                  />
                </>
              )}
            </MyInfoContentEdit>
          </>
        )}
        <MyInfoCareer>
          {edit ? (
            <>
              <InfoContentTitle>
                <p>경력</p>
              </InfoContentTitle>
              {userCareer.length > 0 ? (
                userCareer.map((career: any) => (
                  <InfoContentText key={career.id}>
                    <div>{career.carName}</div>
                    <div>
                      {career.carStartDay}~{career.carEndDay}
                    </div>
                  </InfoContentText>
                ))
              ) : (
                <InfoContentText>
                  <div>등록된 경력이 없습니다.</div>
                </InfoContentText>
              )}
            </>
          ) : (
            <>
              <InfoContentTitle>
                <p>경력</p>
                <p onClick={addCareerInput}>+</p>
              </InfoContentTitle>
              {userCareer.map((career: any) => (
                <InputCareer key={career.id}>
                  <input
                    type="text"
                    placeholder="회사명"
                    value={career.carName}
                    onChange={(e) =>
                      setCareerValue((prev) => ({
                        ...prev,
                        userCareer: prev.userCareer.map((item: any) =>
                          item.id === career.id
                            ? {
                                ...item,
                                carName: e.target.value,
                              }
                            : item
                        ),
                      }))
                    }
                  />
                  <input
                    type="date"
                    value={career.carStartDay}
                    onChange={(e) =>
                      setCareerValue((prev) => ({
                        ...prev,
                        userCareer: prev.userCareer.map((item: any) =>
                          item.id === career.id
                            ? { ...item, carStartDay: e.target.value }
                            : item
                        ),
                      }))
                    }
                  />
                  <input
                    type="date"
                    value={career.carEndDay}
                    onChange={(e) =>
                      setCareerValue((prev) => ({
                        ...prev,
                        userCareer: prev.userCareer.map((item: any) =>
                          item.id === career.id
                            ? { ...item, carEndDay: e.target.value }
                            : item
                        ),
                      }))
                    }
                  />
                  <p
                    onClick={() => {
                      deleteCareer(career.id);
                    }}
                    style={{ fontSize: "20px", fontWeight: "bold" }}
                  >
                    -
                  </p>
                </InputCareer>
              ))}
            </>
          )}
        </MyInfoCareer>

        <MyInfocertificate>
          {edit ? (
            <>
              <InfoContentTitle>
                <p>자격증</p>
              </InfoContentTitle>

              {userCertificate.length > 0 ? (
                userCertificate.map((certificate: any) => (
                  <InfoContentText key={certificate.id}>
                    <div>{certificate.certName}</div>
                    <div>{certificate.certDate}</div>
                  </InfoContentText>
                ))
              ) : (
                <InfoContentText>등록된 자격증이 없습니다.</InfoContentText>
              )}
            </>
          ) : (
            <>
              <InfoContentTitle>
                <p>자격증</p>
                <p onClick={addCertificateInput}>+</p>
              </InfoContentTitle>
              {userCertificate.map((certificate: any) => (
                <InputCareer key={certificate.id}>
                  <input
                    type="text"
                    placeholder="자격증 이름"
                    value={certificate.certName}
                    onChange={(e) =>
                      setCareerValue((prev) => ({
                        ...prev,
                        userCertificate: prev.userCertificate.map((item: any) =>
                          item.id === certificate.id
                            ? { ...item, certName: e.target.value }
                            : item
                        ),
                      }))
                    }
                  ></input>

                  <input
                    type="date"
                    value={certificate.certDate}
                    onChange={(e) =>
                      setCareerValue((prev) => ({
                        ...prev,
                        userCertificate: prev.userCertificate.map((item: any) =>
                          item.id === certificate.id
                            ? { ...item, certDate: e.target.value }
                            : item
                        ),
                      }))
                    }
                  ></input>
                  <p
                    onClick={() => {
                      deleteCertificate(certificate.id);
                    }}
                    style={{ fontSize: "20px", fontWeight: "bold" }}
                  >
                    -
                  </p>
                </InputCareer>
              ))}
            </>
          )}
        </MyInfocertificate>

        <MyInfoText>
          <InfoContentTitle>
            <p>한줄소개</p>
          </InfoContentTitle>
          {edit ? (
            <InfoContentLineText>
              {userLineText ? (
                <>{userLineText}</>
              ) : (
                <>등록된 한줄소개가 없습니다.</>
              )}
            </InfoContentLineText>
          ) : (
            <>
              <InfoContentLineText>
                <Input
                  placeholder="한줄소개를 입력하세요"
                  value={userInfoValue.userLineText}
                  setValue={(newValue) =>
                    setUserInfoValue((prevInfoEdit: any) => ({
                      ...prevInfoEdit,
                      userLineText: newValue,
                    }))
                  }
                />
              </InfoContentLineText>
            </>
          )}
        </MyInfoText>
      </TopSection>
      <BottomSection>
        {edit ? (
          <Button text={"이력서 수정하기"} onClick={clickEdit} />
        ) : (
          <Button text={"이력서 수정완료"} onClick={sendCareerEdit} />
        )}
      </BottomSection>
    </Section>
  );
};

export default MyCareer;
