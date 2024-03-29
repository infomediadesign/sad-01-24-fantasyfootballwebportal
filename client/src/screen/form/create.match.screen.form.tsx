"use client";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MatchServices } from "@/services/match/match.services";
import { MatchServicesType } from "@/services/match/type";
import {
  MatchCreateSchema,
  MatchCreateSchemaType,
} from "@/validation/form.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { ClubServices } from "@/services/club/club.services";
// import { MultipleSelect } from "@/components/multipleselect/multiple.select";
import { TextBox } from "@/components/textbox";
import { Select } from "@/components/select";
import { Button } from "@/components/button";
import React, { useEffect, useState } from "react";
import { PlayerServiceType } from "@/services/player/type";
import { MPlayer } from "@/components/multipleselect/type";
import toast from "react-hot-toast";
import { MultipleSelect } from "@/components/multipleselect/multiple.select";

export const CreateMatchScreenForm = () => {
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const {
    setError,
    handleSubmit,
    control,
    reset,
    getValues,
    watch,
    formState: { errors },
  } = useForm<MatchCreateSchemaType>({
    resolver: yupResolver(MatchCreateSchema),
    mode: "all",
  });

  const { mutateAsync, isPending } = useMutation<
    string,
    Error,
    MatchServicesType.CreateMatch
  >({
    mutationFn: (data) => MatchServices.Create(data),
    onSuccess: (res) => {
      toast.success("Created");
    },
    onError: (error) => {
      const AxiosErr = error as AxiosError;
      const err = AxiosErr?.response?.data as {
        message: string;
        path:
        | "team1"
        | "team2"
        | "team1players"
        | "team2players"
        | "match_time";
      };
      setError(err.path, {
        type: "manual",
        message: err.message,
      });
    },
  });

  const ClubList = useQuery({
    queryKey: ["clubList"],
    queryFn: async () => ClubServices.List(),
  });
  const ClubPlayerListA = useQuery({
    queryKey: ["clubListPlayerA"],
    queryFn: () =>
      ClubServices.ClubDetails({
        _id: teamA,
      }),
  });
  const ClubPlayerListB = useQuery({
    queryKey: ["clubListPlayerB"],
    queryFn: () =>
      ClubServices.ClubDetails({
        _id: teamB,
      }),
  });
  useEffect(() => {
    
    ClubPlayerListA.refetch();
    ClubPlayerListB.refetch();
  }, [teamA, teamB, ClubPlayerListA, ClubPlayerListB]);
  const onSubmit: SubmitHandler<MatchCreateSchemaType> = async (data) => {
    try {
      await mutateAsync(data as MatchServicesType.CreateMatch);
    } catch (e) { }
  };
  const option = ClubPlayerListA.data?.players?.map((player) => ({
    label: player.name,
    value: player._id,
  })) as MPlayer[];


  console.log('team1players', watch('team1players'))


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 flex flex-col gap-10 w-full"
    >
      <div className={"w-full h-[50px]"}>
        <Controller
          name={"team1"}
          control={control}
          render={({ field }) => (
            <Select
              label={"Team A"}
              variation={"standard"}
              innerLabel={"Team A"}
              {...field}
              // onSelect={(event) => setTeamA(event.currentTarget.value)}
              onChange={(event) => setTeamA(event.currentTarget.value)}
              defaultvalueforform={"Team"}
              option={ClubList.data?.map((value) => ({
                id: value._id,
                label: value.name,
              }))}
              errormessage={errors.team1 && errors.team1?.message}
            />
          )}
        />
      </div>
      <div className={"w-full h-auto"}>
        <Controller
          name={"team1players"}
          control={control}
          render={({ field }) => (
            <MultipleSelect
              option={option}
              label={"Select player for team A"}
              errormessage={errors.team1players && errors.team1players?.message}
            />
          )}
        />
      </div>
      <div className={"w-full h-[50px]"}>
        <Controller
          name={"team2"}
          control={control}
          render={({ field }) => (
            <Select
              label={" Team B"}
              variation={"standard"}
              innerLabel={"Team B"}
              {...field}
              onSelect={(event) => setTeamB(event.currentTarget.value)}
              defaultvalueforform={"Clubs A"}
              option={ClubList.data?.map((value) => ({
                id: value._id,
                label: value.name,
              }))}
              errormessage={errors.team1 && errors.team1?.message}
            />
          )}
        />
      </div>
      <div className={"w-full h-auto"}>
        <Controller
          name={"team2players"}
          control={control}
          render={({ field }) => (
            <MultipleSelect
              option={option}
              label={"Select player for team A"}
              errormessage={errors.team2players && errors.team2players?.message}
            />
          )}
        />
      </div>
      <div className={"w-full h-[50px]"}>
        <Controller
          name={"match_time"}
          control={control}
          render={({ field }) => (
            <TextBox
              type={"datetime-local"}
              {...field}
              id="name"
              disabled={isPending}
              variation="standard"
              placeholder="Enter Age"
              label="Player Age"
              errormessage={errors.match_time && errors.match_time?.message}
            />
          )}
        />
      </div>
      <div className={"w-full h-[50px]"}>
        <Button
          type="submit"
          variation={isPending ? "loading-standard" : "standard"}
          isLoading={isPending}
          isSuccess={isPending}
        >
          Create
        </Button>
      </div>
    </form>
  );
};
