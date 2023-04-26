import { Heading, VStack, Icon, useTheme } from "native-base";
import { Envelope, Key } from "phosphor-react-native";
import { useState } from "react";

import Logo from "../assets/logo_primary.svg";

import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function SignIn() {
  const { colors } = useTheme();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />

      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta {name}
      </Heading>

      <Input
        mb={4}
        placeholder="E-mail"
        InputLeftElement={
          <Icon as={Envelope} ml={4} color={colors.gray[300]} />
        }
        onChangeText={setName}
      />
      <Input
        mb={8}
        placeholder="Senha"
        InputLeftElement={<Icon as={Key} ml={4} color={colors.gray[300]} />}
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Entrar" w="full" />
    </VStack>
  );
}
