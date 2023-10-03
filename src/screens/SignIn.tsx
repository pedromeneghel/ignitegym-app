import BackgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import {
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack,
  useToast,
} from "native-base";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

type FormDataProps = {
  email: string;
  password: string;
};

const signUpSchema = yup.object({
  email: yup.string().required("Informe o e-mail").email("E-mail inválido."),
  password: yup.string().required("Informe a senha"),
});

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const toast = useToast();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  async function handleSignIn({ email, password }: FormDataProps) {
    console.log(email, password);

    toast.show({
      title: "Submeteu o formulário!",
      placement: "top",
      bgColor: "green.500",
    });
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={24}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm">
            Treine sua mente e seu corpo
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Acesse sua conta
          </Heading>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                returnKeyType="next"
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                returnKeyType="next"
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button title="Acessar" onPress={handleSubmit(handleSignIn)} />
        </Center>

        <Center mt={24}>
          <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
            Ainda não tem acesso?
          </Text>
          <Button
            title="Criar conta"
            variant="outline"
            onPress={() => navigation.navigate("signUp")}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
