export default (name, className) => {
	const elem = document.createElement(name);
  elem.className = (className) ? className : '';

	return elem;
};
