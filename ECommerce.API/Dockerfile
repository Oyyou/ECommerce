#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

COPY ECommerce.API/Images /app/Images

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["ECommerce.DAL/ECommerce.DAL.csproj", "ECommerce.DAL/"]
RUN dotnet restore "ECommerce.DAL/ECommerce.DAL.csproj"

COPY ["ECommerce.API/ECommerce.API.csproj", "ECommerce.API/"]
RUN dotnet restore "ECommerce.API/ECommerce.API.csproj"

COPY . .

WORKDIR "/src/ECommerce.API"
RUN dotnet build "ECommerce.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ECommerce.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "ECommerce.API.dll"]