import { Heading, VStack, Icon, useTheme } from "native-base";
import auth from "@react-native-firebase/auth";
import { Envelope, Key } from "phosphor-react-native";
import { useState } from "react";
import Logo from "../assets/logo_primary.svg";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Alert } from "react-native";

export function Signin() {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSingIn = () => {
    if (!email || !password) {
      return Alert.alert("Entrar", "Informe email e senha");
    }

    setIsLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);

        if (error.code === "auth/invalid-email") {
          return Alert.alert("Entrar", "E-mail inválido.");
        }
        if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password"
        ) {
          return Alert.alert("Entrar", "E-mail ou senha inválido.");
        }
        return Alert.alert("Entrar", "Não foi possível acessar.");
      });
  };

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />

      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        mb={4}
        placeholder="E-mail"
        InputLeftElement={
          <Icon as={Envelope} ml={4} color={colors.gray[300]} />
        }
        onChangeText={setEmail}
      />
      <Input
        mb={8}
        placeholder="Senha"
        InputLeftElement={<Icon as={Key} ml={4} color={colors.gray[300]} />}
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button
        title="Entrar"
        w="full"
        onPress={handleSingIn}
        isLoading={isLoading}
      />
    </VStack>
  );
}
