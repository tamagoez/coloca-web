import NextLink from "next/link";
import {
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  ButtonGroup,
  Stack,
  Center,
  Divider,
  Text,
  Link,
  InputGroup,
  Button,
  InputRightElement,
  Checkbox,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { signUpWithEmailPass } from "../scripts/auth/signup";
import { OAuthList } from "../components/auth/oauth";

export default function LoginPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [birthday, setBirthday] = useState("");
  const [username, setUsername] = useState("");
  const [logining, setLogining] = useState(false);
  const [check, setCheck] = useState(false);
  // https://qiita.com/kne-cr/items/eba5d331c7ae781bd1c6
  const isEmail = !email.match(/.+@.+\..+/);
  const isPass = pass == "";
  const isUsername = username == "";
  const viewvariant = "flushed";
  const isBirthday = birthday == "";
  // モーダル
  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalbtnRef = useRef(null);
  const toast = useToast();
  async function signupprocess() {
    try {
      await signUpWithEmailPass(email, pass, username, birthday);
      toast({
        title: "Signup Succeed!",
        description: "Check your email",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Login Failed",
        description: err.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }
  function moveauth() {
    if (typeof window === "undefined") return;
    const savedata = { email: email, pass: pass };
    sessionStorage.setItem("authinfo", JSON.stringify(savedata));
    router.push("/login");
  }
  return (
    <>
      <style jsx>{`
      .mainbox {
  display: flex;
  justify-content: center;
  align-items: center;
`}</style>
      <div className="mainbox">
        <Container>
          <Heading my="5">Signup</Heading>
          <Center>
            <OAuthList />
          </Center>
          <Divider my="2" />
          <FormControl isInvalid={isEmail} mb="4">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant={viewvariant}
            />
            {!isEmail ? <></> : <></>}
          </FormControl>
          <FormControl isInvalid={isPass} mb="4">
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                type={show ? "text" : "password"}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                variant={viewvariant}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            {!isPass ? <></> : <></>}
          </FormControl>
          <FormControl isInvalid={isUsername} mb="4">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant={viewvariant}
            />
            {!isUsername ? <></> : <></>}
          </FormControl>
          <FormControl isInvalid={isBirthday} mb="4">
            <FormLabel>Birthday</FormLabel>
            <Input
              type="datetime-local"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              variant={viewvariant}
            />
            {!isBirthday ? <></> : <></>}
          </FormControl>
          <Checkbox isChecked={check} ref={modalbtnRef} onChange={onOpen}>
            利用規約に同意する
          </Checkbox>
          <Center>
            <Stack direction="row" spacing={4} align="center" mt="5">
              <Button
                colorScheme="teal"
                variant="solid"
                isLoading={logining}
                isDisabled={
                  isEmail || isPass || isUsername || isBirthday || !check
                }
                onClick={() => signupprocess()}
              >
                Signup
              </Button>
              <Button
                colorScheme="teal"
                variant="outline"
                onClick={() => moveauth()}
              >
                Login
              </Button>
            </Stack>
          </Center>
        </Container>
      </div>
      <Modal
        onClose={onClose}
        finalFocusRef={modalbtnRef}
        isOpen={isOpen}
        scrollBehavior="inside"
        size="5xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>利用規約</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <b>
              分かりづらいと思われるので、こちらを参考にしてください: 現在準備中
            </b>
            <br />
            この利用規約（以下，「本規約」といいます。）は，Coloca（以下，「当社」といいます。）がこのウェブサイト上で提供するサービス（以下，「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下，「ユーザー」といいます。）には，本規約に従って，本サービスをご利用いただきます。
            <Heading fontSize="xl">第1条（適用）</Heading>
            本規約は，ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されるものとします。
            当社は本サービスに関し，本規約のほか，ご利用にあたってのルール等，各種の定め（以下，「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず，本規約の一部を構成するものとします。
            本規約の規定が前条の個別規定の規定と矛盾する場合には，個別規定において特段の定めなき限り，個別規定の規定が優先されるものとします。
            <Heading fontSize="xl">第2条（利用登録）</Heading>
            本サービスにおいては，登録希望者が本規約に同意の上，当社の定める方法によって利用登録を申請し，当社がこれを承認することによって，利用登録が完了するものとします。
            当社は，利用登録の申請者に以下の事由があると判断した場合，利用登録の申請を承認しないことがあり，その理由については一切の開示義務を負わないものとします。
            利用登録の申請に際して虚偽の事項を届け出た場合
            本規約に違反したことがある者からの申請である場合
            その他，当社が利用登録を相当でないと判断した場合
            <Heading fontSize="xl">
              第3条（ユーザーIDおよびパスワードの管理）
            </Heading>
            ユーザーは，自己の責任において，本サービスのユーザーIDおよびパスワードを適切に管理するものとします。
            ユーザーは，いかなる場合にも，ユーザーIDおよびパスワードを第三者に譲渡または貸与し，もしくは第三者と共用することはできません。当社は，ユーザーIDとパスワードの組み合わせが登録情報と一致してログインされた場合には，そのユーザーIDを登録しているユーザー自身による利用とみなします。
            ユーザーID及びパスワードが第三者によって使用されたことによって生じた損害は，当社に故意又は重大な過失がある場合を除き，当社は一切の責任を負わないものとします。
            <Heading fontSize="xl">第4条（利用料金および支払方法）</Heading>
            現在料金の支払いが必要な機能はありません。
            <s>
              ユーザーは，本サービスの有料部分の対価として，当社が別途定め，本ウェブサイトに表示する利用料金を，当社が指定する方法により支払うものとします。
              ユーザーが利用料金の支払を遅滞した場合には，ユーザーは年14．6％の割合による遅延損害金を支払うものとします。
            </s>
            <Heading fontSize="xl">第5条（禁止事項）</Heading>
            ユーザーは，本サービスの利用にあたり，以下の行為をしてはなりません。
            法令または公序良俗に違反する行為 犯罪行為に関連する行為
            本サービスの内容等，本サービスに含まれる著作権，商標権ほか知的財産権を侵害する行為
            当社，ほかのユーザー，またはその他第三者のサーバーまたはネットワークの機能を破壊したり，妨害したりする行為
            本サービスによって得られた情報を商業的に利用する行為
            当社のサービスの運営を妨害するおそれのある行為
            不正アクセスをし，またはこれを試みる行為
            他のユーザーに関する個人情報等を収集または蓄積する行為
            不正な目的を持って本サービスを利用する行為
            本サービスの他のユーザーまたはその他の第三者に不利益，損害，不快感を与える行為
            他のユーザーに成りすます行為
            当社が許諾しない本サービス上での宣伝，広告，勧誘，または営業行為
            面識のない異性との出会いを目的とした行為
            当社のサービスに関連して，反社会的勢力に対して直接または間接に利益を供与する行為
            その他，当社が不適切と判断する行為{" "}
            <Heading fontSize="xl">第6条（本サービスの提供の停止等）</Heading>
            当社は，以下のいずれかの事由があると判断した場合，ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
            本サービスにかかるコンピュータシステムの保守点検または更新を行う場合
            地震，落雷，火災，停電または天災などの不可抗力により，本サービスの提供が困難となった場合
            コンピュータまたは通信回線等が事故により停止した場合
            その他，当社が本サービスの提供が困難と判断した場合
            当社は，本サービスの提供の停止または中断により，ユーザーまたは第三者が被ったいかなる不利益または損害についても，一切の責任を負わないものとします。
            <Heading fontSize="xl">第7条（利用制限および登録抹消）</Heading>
            当社は，ユーザーが以下のいずれかに該当する場合には，事前の通知なく，ユーザーに対して，本サービスの全部もしくは一部の利用を制限し，またはユーザーとしての登録を抹消することができるものとします。
            本規約のいずれかの条項に違反した場合
            登録事項に虚偽の事実があることが判明した場合
            料金等の支払債務の不履行があった場合
            当社からの連絡に対し，一定期間返答がない場合
            本サービスについて，最終の利用から一定期間利用がない場合
            その他，当社が本サービスの利用を適当でないと判断した場合
            当社は，本条に基づき当社が行った行為によりユーザーに生じた損害について，一切の責任を負いません。
            <Heading fontSize="xl">第8条（退会）</Heading>
            ユーザーは，当社の定める退会手続により，本サービスから退会できるものとします。
            <Heading fontSize="xl">第9条（保証の否認および免責事項）</Heading>
            当社は，本サービスに事実上または法律上の瑕疵（安全性，信頼性，正確性，完全性，有効性，特定の目的への適合性，セキュリティなどに関する欠陥，エラーやバグ，権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
            当社は，本サービスに起因してユーザーに生じたあらゆる損害について、当社の故意又は重過失による場合を除き、一切の責任を負いません。ただし，本サービスに関する当社とユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合，この免責規定は適用されません。
            前項ただし書に定める場合であっても，当社は，当社の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害のうち特別な事情から生じた損害（当社またはユーザーが損害発生につき予見し，または予見し得た場合を含みます。）について一切の責任を負いません。また，当社の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害の賠償は，ユーザーから当該損害が発生した月に受領した利用料の額を上限とします。
            当社は，本サービスに関して，ユーザーと他のユーザーまたは第三者との間において生じた取引，連絡または紛争等について一切責任を負いません。
            <Heading fontSize="xl">第10条（サービス内容の変更等）</Heading>
            当社は，ユーザーへの事前の告知をもって、本サービスの内容を変更、追加または廃止することがあり、ユーザーはこれを承諾するものとします。
            <Heading fontSize="xl">第11条（利用規約の変更）</Heading>
            当社は以下の場合には、ユーザーの個別の同意を要せず、本規約を変更することができるものとします。
            本規約の変更がユーザーの一般の利益に適合するとき。
            本規約の変更が本サービス利用契約の目的に反せず、かつ、変更の必要性、変更後の内容の相当性その他の変更に係る事情に照らして合理的なものであるとき。
            当社はユーザーに対し、前項による本規約の変更にあたり、事前に、本規約を変更する旨及び変更後の本規約の内容並びにその効力発生時期を通知します。
            <Heading fontSize="xl">第12条（個人情報の取扱い）</Heading>
            当社は，本サービスの利用によって取得する個人情報については，当社「プライバシーポリシー」に従い適切に取り扱うものとします。
            <Heading fontSize="xl">第13条（通知または連絡）</Heading>
            ユーザーと当社との間の通知または連絡は，当社の定める方法によって行うものとします。当社は,ユーザーから,当社が別途定める方式に従った変更届け出がない限り,現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い,これらは,発信時にユーザーへ到達したものとみなします。
            <Heading fontSize="xl">第14条（権利義務の譲渡の禁止）</Heading>
            ユーザーは，当社の書面による事前の承諾なく，利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し，または担保に供することはできません。
            <Heading fontSize="xl">第15条（準拠法・裁判管轄）</Heading>
            本規約の解釈にあたっては，日本法を準拠法とします。
            <s>
              本サービスに関して紛争が生じた場合には，当社の本店所在地を管轄する裁判所を専属的合意管轄とします。
            </s>
            <br />
            以上
            <br />
            <Button onClick={() => setCheck(false)} mr="1">
              利用規約の内容に同意しない
            </Button>
            <Button onClick={() => setCheck(true)}>
              利用規約の内容全てに同意する
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
