# Part 2: Build image to deploy angular app
# Create image for the angular
FROM nginx

# COPY --from=builder /tiger-wallet/dist/* /usr/share/nginx/html/
COPY ./dist/tiger-cub/* /usr/share/nginx/html/

EXPOSE 80

