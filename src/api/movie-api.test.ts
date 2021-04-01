import { getMovies } from "./";
import { SortingOptionsProperties, Categories } from "../shared/enums";
import { getMovie, addMovie, deleteMovie, editMovie } from "./movie-api";

const mockJSONPromise = Promise.resolve(null);
let mockFetchPromise = Promise.resolve({
  json: () => mockJSONPromise,
  ok: true,
});

const API_URL = "http://localhost:4000/movies";
const limit = 12;
const headers = {
  "Content-Type": "application/json",
};

describe("movie-api", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
  });

  describe("getMovies", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should call with same url, headers and selectedCategory as DOCUMENTARY", () => {
      const sortingOption = SortingOptionsProperties.RATING;
      const isDownDirection = true;
      const selectedCategory = Categories.DOCUMENTARY;
      const searchingValue = "";
      const offset = 0;
      getMovies({
        sortingOption,
        isDownDirection,
        selectedCategory,
        searchingValue,
        offset,
      }).then(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          API_URL +
            `?limit=${limit}&offset=${offset}&searchBy=title&search=${searchingValue}&sortOrder=${
              isDownDirection ? "desc" : "asc"
            }&sortBy=${sortingOption}&filter=${selectedCategory}`,
          {
            headers,
          }
        );
      });
    });

    it("should call with same url, headers and selectedCategory as All", () => {
      const sortingOption = SortingOptionsProperties.RATING;
      const isDownDirection = false;
      const selectedCategory = Categories.ALL;
      getMovies({
        sortingOption,
        isDownDirection,
        selectedCategory,
      }).then(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          API_URL +
            `?limit=${limit}&offset=0&searchBy=title&search=&sortOrder=${
              isDownDirection ? "desc" : "asc"
            }&sortBy=${sortingOption}&filter=`,
          {
            headers,
          }
        );
      });
    });
  });

  describe("getMovie", () => {
    const id = "6";

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should called with same url", () => {
      getMovie(id).then(() => {
        expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/${id}`, {
          headers,
        });
      });
    });
  });

  describe("addMovie", () => {
    const movie = null as any;

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should called with same url and data", () => {
      addMovie(movie).then(() => {
        expect(global.fetch).toHaveBeenCalledWith(`${API_URL}`, {
          method: "POST",
          headers,
          body: JSON.stringify(movie),
        });
      });
    });
  });

  describe("deleteMovie", () => {
    const id = 5;

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should called with same url and data", () => {
      deleteMovie(id).then(() => {
        expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/${id}`, {
          method: "DELETE",
          headers,
        });
      });
    });
  });

  describe("editMovie", () => {
    const movie = null as any;

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should called with same url and data", () => {
      editMovie(movie).then(() => {
        expect(global.fetch).toHaveBeenCalledWith(`${API_URL}`, {
          method: "PUT",
          headers,
          body: JSON.stringify(movie),
        });
      });
    });

    it("should called with same url and data", () => {
      mockFetchPromise = Promise.resolve({
        json: () => mockJSONPromise,
        ok: false,
      });
      global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
      editMovie(movie).catch(() => {
        expect(global.fetch).toHaveBeenCalledWith(`${API_URL}`, {
          method: "PUT",
          headers,
          body: JSON.stringify(movie),
        });
      });
    });
  });
});
